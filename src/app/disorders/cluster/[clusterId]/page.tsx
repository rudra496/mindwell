import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  DISORDER_CLUSTERS,
  getCluster,
  getDisordersForCluster,
} from "@/lib/disorder-clusters";

export function generateStaticParams() {
  return DISORDER_CLUSTERS.map((c) => ({ clusterId: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ clusterId: string }>;
}): Promise<Metadata> {
  const { clusterId } = await params;
  const cluster = getCluster(clusterId);
  return {
    title: cluster ? `${cluster.name} — Conditions` : "Conditions",
    description: cluster?.description,
  };
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ clusterId: string }>;
}) {
  const { clusterId } = await params;
  const cluster = getCluster(clusterId);
  if (!cluster) notFound();
  const disorders = getDisordersForCluster(clusterId);

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl" id="main-content">
      <Link
        href="/disorders"
        className="text-sm text-teal-700 hover:underline dark:text-teal-400"
      >
        ← All categories
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">{cluster.name}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{cluster.description}</p>
      <p className="mt-1 text-sm text-slate-500">{disorders.length} conditions</p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {disorders.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/disorders/${d.slug}`}
              className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-teal-400 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="font-medium text-slate-900 dark:text-slate-100">{d.name}</span>
              {d.description ? (
                <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                  {d.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
