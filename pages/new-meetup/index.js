import NewMeetupForm from "@/components/meetups/NewMeetupForm";

export default function NewMeetup() {
  function addMeetupHandler(enteredMeetup) {
    console.log(enteredMeetup);
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
