import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
  html_url: string;
};

// Define dynamic paths
export const getStaticPaths: GetStaticPaths = async () => {
  const repoNames = ["next.js", "react", "vercel"]; // Add more repos if needed

  return {
    paths: repoNames.map((name) => ({ params: { name } })),
    fallback: true, // Enable fallback for other repo names
  };
};

// Fetch data for each repo
export const getStaticProps: GetStaticProps<{ repo: Repo }> = async ({ params }) => {
  const res = await fetch(`https://api.github.com/repos/vercel/${params?.name}`);
  
  if (!res.ok) {
    return { notFound: true }; // Handle errors
  }

  const repo = await res.json();
  return { props: { repo }, revalidate: 10 }; // Revalidate every 10 seconds
};

export default function RepoPage({ repo }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!repo) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">{repo.name}</h1>
        <p className="text-gray-600">⭐ {repo.stargazers_count} stars</p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          View Repository
        </a>
      </div>
    </div>
  );
}
