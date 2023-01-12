import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://picsum.photos/seed/picsum/300/300",
    address: "Something 32, A block C, Haryana",
    description: "This is going to be my first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://picsum.photos/seed/picsum/500/500",
    address: "Something 32, A block C, Haryana",
    description: "This is going to be my first meetup",
  },
];
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>All Meetups</title>
        <meta name="description" content="Be ready to explore the social meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(context){
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }
// }

export async function getStaticProps() {
  const uri = "mongodb://127.0.0.1:27017";

  const client = await MongoClient.connect(uri);

  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetup");

  const result = await meetupsCollection.find().toArray();

  client.close();

  console.log(result);
  return {
    props: {
      meetups: result.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
}

export default HomePage;
