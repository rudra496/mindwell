# Contributing to MindWell

Thank you for your interest in contributing to MindWell! This platform aims to be the world's most comprehensive free mental health resource.

## 🎯 Our Mission

Create the most comprehensive, scientifically-backed mental health support platform. **100% Free. 100% Open Source.**

## 🤝 How to Contribute

### Types of Contributions We Welcome

1. **Medical Content**
   - Adding new mental health disorders with comprehensive information
   - Adding validated assessment tools
   - Adding evidence-based therapy techniques
   - Adding guided meditation scripts
   - Improving existing medical content accuracy

2. **Features & Code**
   - New therapeutic games or activities
   - UI/UX improvements
   - Bug fixes
   - Performance optimizations
   - Accessibility enhancements

3. **Documentation**
   - Improving README and guides
   - Adding translations
   - Creating tutorials
   - Documenting features

4. **Testing**
   - Writing tests
   - Reporting bugs
   - Suggesting improvements

## 📋 Guidelines

### Medical Content Guidelines

**CRITICAL: All medical information must be:**
- Evidence-based and cited from reputable sources
- Reviewed by mental health professionals (if possible)
- Clearly sourced (NIMH, WHO, APA, peer-reviewed research)
- Include appropriate disclaimers
- Never claim to diagnose or treat conditions

**Acceptable Sources:**
- National Institute of Mental Health (NIMH)
- World Health Organization (WHO)
- American Psychiatric Association (APA)
- PubMed peer-reviewed research
- Cochrane Reviews
- DSM-5 criteria
- Validated assessment tools with proper citations

**Unacceptable Sources:**
- Personal opinions without research backing
- Non-peer-reviewed sources
- Commercial/promotional content
- Pseudoscience or alternative medicine without evidence base

### Code Guidelines

1. **Follow existing code style**
   - Use TypeScript
   - Follow Next.js 14+ App Router patterns
   - Use Tailwind CSS for styling
   - Use Radix UI components where possible

2. **Keep it accessible**
   - Test with screen readers
   - Ensure keyboard navigation works
   - Use semantic HTML
   - Maintain WCAG 2.1 AA compliance

3. **Privacy first**
   - No external tracking or analytics
   - All user data stays client-side (IndexedDB)
   - No personally identifiable information collected
   - Anonymous by default

4. **Mobile responsive**
   - Test on mobile devices
   - Use responsive design patterns
   - Touch-friendly interactions

### Pull Request Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/rudra496/mindwell.git
   cd mindwell
   npm install
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, descriptive commit messages
   - Keep commits focused and atomic
   - Test your changes thoroughly

4. **Test your changes**
   ```bash
   npm run dev      # Test locally
   npm run build    # Ensure it builds
   npm run lint     # Check for linting errors
   ```

5. **Submit a pull request**
   - Describe what you changed and why
   - Reference any related issues
   - Include screenshots for UI changes
   - Cite sources for medical content

## 📚 Adding New Content

### Adding a New Disorder

Disorders should include:
- **Name and description**: Clear, accessible language
- **Symptoms**: 15-20 specific symptoms
- **Causes**: Biological, psychological, and social factors
- **Prevalence**: Statistics from NIMH, WHO, etc.
- **Age of onset**: Typical age range
- **Course**: How the condition typically progresses
- **Risk factors**: What increases risk
- **Protective factors**: What reduces risk
- **Comorbidities**: Commonly co-occurring conditions
- **Natural solutions**: 20+ evidence-based self-help strategies
- **Nutritional recommendations**: 15+ dietary factors
- **Therapy approaches**: 10+ therapeutic interventions
- **When to seek help**: Clear guidelines
- **Crisis resources**: Emergency contacts
- **Research links**: PubMed, NIMH, etc.
- **DSM-5 criteria**: Diagnostic criteria (if applicable)

Add to `prisma/seed.ts` following the existing format.

### Adding a New Assessment

Assessments should:
- Be validated, published screening tools
- Include full question set
- Include proper scoring algorithm
- Include clinical interpretation
- Include appropriate disclaimers
- Never claim to diagnose
- Include crisis detection for severe scores
- Cite original source/validation studies

Add to `prisma/seed.ts` following the existing format.

### Adding a New Game/Activity

Games should:
- Have clear therapeutic benefit
- Be evidence-based (cite research)
- Be accessible and easy to use
- Work on mobile devices
- Include instructions
- Explain benefits

Create in `src/components/games/` and add to `GamesModal.tsx`.

### Adding a New Meditation

Meditations should:
- Include full script
- Specify duration
- List benefits (with citations if possible)
- Be appropriate for general audience
- Not include religious content (keep secular)
- Be evidence-based

Add to `prisma/seed.ts` following the existing format.

### Adding a New Therapy Technique

Techniques should:
- Be evidence-based (CBT, DBT, ACT, etc.)
- Include step-by-step instructions
- Provide examples
- Explain when to use
- Cite original source
- Be accessible to non-professionals

Add to `prisma/seed.ts` following the existing format.

## 🚫 What We Don't Accept

- Promotional content or spam
- Unscientific or pseudoscientific claims
- Diagnostic tools (screening only)
- Religious or spiritual content (keep secular)
- Content that could be harmful
- Copyrighted material without permission
- Personal anecdotes presented as medical fact
- Alternative medicine without evidence base
- Anti-psychiatry or anti-treatment messaging

## ⚠️ Medical Disclaimer

All contributors must understand and respect that:
- This platform is for education and support ONLY
- It does NOT diagnose, treat, or cure any condition
- It is NOT a substitute for professional medical care
- We have a responsibility to provide accurate, safe information
- Crisis situations require immediate professional help

## 🔒 Security

If you discover a security vulnerability:
1. **Do NOT** open a public issue
2. Email the maintainers privately
3. Wait for a response before disclosing publicly

## 📧 Questions?

- Open an issue for discussion
- Tag maintainers for urgent matters
- Be respectful and patient

## 📜 Code of Conduct

- Be respectful and professional
- Focus on what's best for the community
- Accept constructive criticism gracefully
- Show empathy and kindness
- Mental health is sensitive - treat all discussions with care

## 🎉 Recognition

All contributors will be acknowledged in our CREDITS.md file.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make mental health resources accessible to everyone!** 💚🧠
