// import { Head } from "next/head";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// export async function getServerSideProps(context) {
//   //   const req = context.req;
//   //   const res = context.res;
//   //fetch data from an api
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          description: meetup.description,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 10,
  };
};

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Next Meetup</title>
        <meta
          name="description"
          content="Browse some starting next js project"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export default HomePage;
