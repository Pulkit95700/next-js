import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

const NewsPage = () => {
    const router = useRouter();
    const onAddMeetupHander = async (data) => {
        try{
            const response = await fetch("/api/new-meetup", {
                method: "POST",
                body: JSON.stringify({...data}),
                headers: {
                    'Content-Type': "application/json",
                }
            })
            if(!response.ok){
                console.log(response);
                throw new Error("error in response");
            }
        const d = await response.json();
        console.log(d);
        alert("process finished");
    }catch(err){
        console.log("could not continue");
    }
}

  return (
    <>
        <Head>
            <title>Add New Meetup</title>
            <meta name="description" content="Plan your first meetup for the day" />
        </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHander} />
    </>
  );
};

export default NewsPage;
