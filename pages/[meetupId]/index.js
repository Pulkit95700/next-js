import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                title = {props.meetupData.title}
                address = {props.meetupData.address}
                image = {props.meetupData.image}
                description = {props.meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths(context){
    const uri = "mongodb://127.0.0.1:27017";

    const client = await MongoClient.connect(uri);
  
    const db = client.db("meetups");

    const meetupsCollection = db.collection('meetup');
  
    const result = await meetupsCollection.find({}, {_id: 1}).toArray();

    const paths = result.map((meetup) => {
        return {params: {meetupId: meetup._id.toString()}}
    })
  
    client.close();
    return {
        fallback: false,
        paths: paths
    }
}

export async function getStaticProps(context){
    const req = context.req;

    const meetupId = context.params.meetupId;

    const uri = "mongodb://127.0.0.1:27017";

    const client = await MongoClient.connect(uri);
  
    const db = client.db("meetups");

    const meetupsCollection = db.collection('meetup');
  
    const result = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    client.close();

    return {
        props: {
            meetupData: {
                id: result._id.toString(),
                title: result.title,
                address: result.address,
                description: result.description,
                image: result.image,
            }
        }
    }
}
export default MeetupDetails;