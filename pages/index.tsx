import React from "react";
interface user{
  name:string;
  bio:string;
}
const Home = ({ data }: { data: user }) => {
  return (
    <div>
      <h1>Next.js getInitialProps Example</h1>
      <p>Data from API: {data.name}</p>
    </div>
  );
};

// Fetching data using getInitialProps
Home.getInitialProps = async () => {
  const res = await fetch("https://api.github.com/users/octocat");
  const json = await res.json();
  return { data: json };
};

export default Home;
