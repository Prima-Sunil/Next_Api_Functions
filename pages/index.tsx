/* eslint-disable @next/next/no-img-element */
// import React from "react";
// interface user{
//   name:string;
//   bio:string;
// }
// const Home = ({ data }: { data: user }) => {
//   return (
//     <div>
//       <h1>Next.js getInitialProps Example</h1>
//       <p>Data from API: {data.name}</p>
//       <p>Bio: {data.bio}</p>
//     </div>
//   );
// };

// // Fetching data using getInitialProps
// Home.getInitialProps = async () => {
//   const res = await fetch("https://api.github.com/users/octocat");
//   const json = await res.json();
//   return { data: json };
// };

// // getInitialProps receives a single argument called context, which is an object with the following properties:

// // Name	Description
// // pathname	Current route, the path of the page in /pages
// // query	Query string of the URL, parsed as an object
// // asPath	String of the actual path (including the query) shown in the browser
// // req	HTTP request object (server only)
// // res	HTTP response object (server only)
// // err	Error object if any error is encountered during the rendering

// export default Home;

// using getServerSideProps

// import React from "react";

// interface User {
//   avatar_url: string;
//   login: string;
//   public_repos: number;
//   followers: number;
//   html_url: string;
// }
// // Fetch GitHub user data at request time
// export async function getServerSideProps() {
//   const res = await fetch("https://api.github.com/users/Prima-Sunil");
//   const user = await res.json();
//   return { props: { user } };
// }
// const GitHubProfile = ({ user }: { user: User }) => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
//         <img
//           src={user.avatar_url}
//           alt="GitHub Avatar"
//           className="w-24 h-24 rounded-full mx-auto"
//         />
//         <h2 className="text-xl font-bold mt-4">{user.login}</h2>
//         <p className="text-gray-600">Public Repos: {user.public_repos}</p>
//         <p className="text-gray-600">Followers: {user.followers}</p>
//         <a
//           href={user.html_url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//         >
//           Visit GitHub Profile
//         </a>
//       </div>
//     </div>
//   );
// };

// export default GitHubProfile;
// getServerSideProps fetches data on every request from GitHub.
// The fetched user data is passed as props to the GitHubProfile component

// import Link from "next/link";

// export default function Home() {
//   const repos = ["next.js", "react", "vercel"]; // List of predefined repositories

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">GitHub Repositories</h1>
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//         {repos.map((repo) => (
//           <Link key={repo} href={`/repos/${repo}`}>
//             {/* <a className="block px-4 py-2 bg-blue-500 text-white rounded-md m-2 hover:bg-blue-600 transition"> */}
//               {repo}
//             {/* </a> */}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// 🎯 Conclusion
// Fix Option	When to Use
// ✅ Move to /pages/[name].js and use getStaticPaths	If you want static generation for dynamic pages (SSG)
// ✅ Use getServerSideProps	If you need fresh data on every request (SSR)



// get Stactic Props

import React from "react";

export async function getStaticProps() {
  const res = await fetch("https://api.github.com/users/Prima-Sunil");

  if (!res.ok) {
    return { notFound: true }; // Show a 404 if data isn't found
  }

  const user = await res.json();

  return {
    props: { user },
    revalidate: 10, // Re-generate page every 10 seconds (ISR)
  };
}

interface User {
  avatar_url: string;
  login: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

export default function Home({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <img
          src={user.avatar_url}
          alt="GitHub Avatar"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h1 className="text-2xl font-bold mt-4">{user.login}</h1>
        <p className="text-gray-600">Public Repos: {user.public_repos}</p>
        <p className="text-gray-600">Followers: {user.followers}</p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
}

// 
