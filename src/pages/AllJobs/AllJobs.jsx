import { useState } from "react";
import useJobs from "../../hooks/useJobs";
import HotJobCard from "../Home/HotJobCard";

const AllJobs = () => {
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState("");
  const { jobs, loading } = useJobs(sort, search);

  if (loading) {
    return <h1>Loading---------</h1>;
  }
  console.log(sort);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8">All Jobs</h1>
      <div className="bg-slate-800 space-x-4 py-6">
        <button
          onClick={() => {
            setSort(!sort);
          }}
          className={`btn w-36  ${sort && "btn-warning"}`}
        >
          {!sort ? "Sort by price" : "Sorted"}
        </button>
        <input
          onKeyUp={(e) => setSearch(e.target.value)}
          className="input"
          type="text"
          placeholder="Search by Locations"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {jobs.map((job) => (
          <HotJobCard key={job._id} job={job}></HotJobCard>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
