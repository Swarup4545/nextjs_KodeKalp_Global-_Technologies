import SignupPage from "./signup/page";
export default function Home() {
  
  return (
    <>
      <div className="bg-slate-700">
          <h1 className="text-center text-4xl text-font">Resume Creator</h1>
          <SignupPage/>
      </div>
    </>
  );
}
