import ReportCard from "./ReportCard";

function ReportCards({reports}){
    return reports.map((report, index) => (
        <ReportCard report={report} key={index}/>
    ))
}

export default ReportCards;