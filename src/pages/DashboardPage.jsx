import React, { useEffect } from "react";
import DashboardLayout from "../components/shared/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import useGetTotalCounts from "../hooks/useGetTotalCounts";

function DashboardPage() {
  const { counts, countsLoading, getCounts } = useGetTotalCounts();

  useEffect(() => {
    getCounts();
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="px-5 pt-4 pb-5">
          <DashboardCard countsLoading={countsLoading} counts={counts} />
        </div>
      </DashboardLayout>
    </>
  );
}

export default DashboardPage;
