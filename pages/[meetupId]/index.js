import MeetUpDetail from "@/components/meetups/MeetUpDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetUpDetails({ meetupData }) {
  return (
    <MeetUpDetail
      id={meetupData.id}
      title={meetupData.title}
      image={meetupData.image}
      address={meetupData.address}
      description={meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/meetupId", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const meetups = data.meetups;
  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
}

export async function getStaticProps(context) {
  //fetch data for single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const singleMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  console.log(singleMeetup);
  client.close();
  return {
    props: {
      meetupData: {
        id: singleMeetup._id.toString(),
        title: singleMeetup.title,
        image: singleMeetup.image,
        address: singleMeetup.address,
        description: singleMeetup.description,
      },
    },
  };
}
