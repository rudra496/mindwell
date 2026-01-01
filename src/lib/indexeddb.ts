/**
 * IndexedDB utility for client-side data persistence
 * Provides a simple interface for storing and retrieving data locally
 */

const DB_NAME = 'MindWellDB'
const DB_VERSION = 1

export interface MoodEntry {
  id?: number
  mood: number
  notes?: string
  activities?: string[]
  date: Date
}

export interface GratitudeEntry {
  id?: number
  entry: string
  date: Date
}

export interface AssessmentResult {
  id?: number
  assessmentId: string
  assessmentName: string
  answers: Record<number, number>
  score: number
  severity: string
  date: Date
}

export interface CommunityPost {
  id: string
  title: string
  content: string
  category: string
  anonymous: boolean
  username: string
  likes: number
  hasWarning: boolean
  warningText?: string
  createdAt: Date
  updatedAt: Date
  replies?: CommunityReply[]
  _count?: { replies: number }
}

export interface CommunityReply {
  id: string
  postId: string
  content: string
  username: string
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface ChatMessage {
  id?: number
  message: string
  response: string
  crisisLevel: string
  timestamp: Date
}

class IndexedDBManager {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores
        if (!db.objectStoreNames.contains('moodEntries')) {
          db.createObjectStore('moodEntries', { keyPath: 'id', autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('gratitudeEntries')) {
          db.createObjectStore('gratitudeEntries', { keyPath: 'id', autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('assessmentResults')) {
          db.createObjectStore('assessmentResults', { keyPath: 'id', autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('communityPosts')) {
          db.createObjectStore('communityPosts', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('communityReplies')) {
          const store = db.createObjectStore('communityReplies', { keyPath: 'id' })
          store.createIndex('postId', 'postId', { unique: false })
        }
        if (!db.objectStoreNames.contains('chatHistory')) {
          db.createObjectStore('chatHistory', { keyPath: 'id', autoIncrement: true })
        }
      }
    })
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init()
    }
    return this.db!
  }

  // Generic CRUD operations
  async add<T>(storeName: string, data: T): Promise<IDBValidKey> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.add(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.getAll()

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async get<T>(storeName: string, id: IDBValidKey): Promise<T | undefined> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly')
      const store = transaction.objectStore(storeName)
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async update<T>(storeName: string, data: T): Promise<IDBValidKey> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.put(data)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async delete(storeName: string, id: IDBValidKey): Promise<void> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async clear(storeName: string): Promise<void> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite')
      const store = transaction.objectStore(storeName)
      const request = store.clear()

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Get replies by post ID
  async getRepliesByPostId(postId: string): Promise<CommunityReply[]> {
    const db = await this.ensureDB()
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('communityReplies', 'readonly')
      const store = transaction.objectStore('communityReplies')
      const index = store.index('postId')
      const request = index.getAll(postId)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
}

// Singleton instance
export const db = new IndexedDBManager()

// Convenience methods
export const MoodTracker = {
  async addEntry(entry: Omit<MoodEntry, 'id'>): Promise<number> {
    return await db.add('moodEntries', { ...entry, date: new Date(entry.date) }) as number
  },
  async getAllEntries(): Promise<MoodEntry[]> {
    return await db.getAll<MoodEntry>('moodEntries')
  },
  async clearAll(): Promise<void> {
    return await db.clear('moodEntries')
  }
}

export const GratitudeJournal = {
  async addEntry(entry: Omit<GratitudeEntry, 'id'>): Promise<number> {
    return await db.add('gratitudeEntries', { ...entry, date: new Date(entry.date) }) as number
  },
  async getAllEntries(): Promise<GratitudeEntry[]> {
    return await db.getAll<GratitudeEntry>('gratitudeEntries')
  },
  async clearAll(): Promise<void> {
    return await db.clear('gratitudeEntries')
  }
}

export const Assessments = {
  async saveResult(result: Omit<AssessmentResult, 'id'>): Promise<number> {
    return await db.add('assessmentResults', { ...result, date: new Date(result.date) }) as number
  },
  async getAllResults(): Promise<AssessmentResult[]> {
    return await db.getAll<AssessmentResult>('assessmentResults')
  },
  async getResultsByAssessment(assessmentId: string): Promise<AssessmentResult[]> {
    const all = await db.getAll<AssessmentResult>('assessmentResults')
    return all.filter(r => r.assessmentId === assessmentId)
  },
  async clearAll(): Promise<void> {
    return await db.clear('assessmentResults')
  }
}

export const Community = {
  async createPost(post: CommunityPost): Promise<string> {
    await db.add('communityPosts', post)
    return post.id
  },
  async getAllPosts(): Promise<CommunityPost[]> {
    return await db.getAll<CommunityPost>('communityPosts')
  },
  async getPost(id: string): Promise<CommunityPost | undefined> {
    return await db.get<CommunityPost>('communityPosts', id)
  },
  async updatePost(post: CommunityPost): Promise<void> {
    await db.update('communityPosts', post)
  },
  async addReply(reply: CommunityReply): Promise<string> {
    await db.add('communityReplies', reply)
    return reply.id
  },
  async getReplies(postId: string): Promise<CommunityReply[]> {
    return await db.getRepliesByPostId(postId)
  },
  async updateReply(reply: CommunityReply): Promise<void> {
    await db.update('communityReplies', reply)
  }
}

export const ChatHistory = {
  async addMessage(message: Omit<ChatMessage, 'id'>): Promise<number> {
    return await db.add('chatHistory', { ...message, timestamp: new Date(message.timestamp) }) as number
  },
  async getAllMessages(): Promise<ChatMessage[]> {
    return await db.getAll<ChatMessage>('chatHistory')
  },
  async clearAll(): Promise<void> {
    return await db.clear('chatHistory')
  }
}
