import MeetupList from "../components/meetups/MeetupList";

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
  const response = await fetch("http://localhost:3000/api/meetup", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  const meetups = data.meetups;
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
    revalidate: 1,
  };
};

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export default HomePage;
