import ChartSection from '../../components/Chart/ChartSection';
import SummaryCards from '../../components/Chart/SummaryCards';
import TableSection from '../../components/Chart/TableSection';

const DashBoard = () => {
    return (
        <div>
            <SummaryCards />
            <ChartSection />
            <TableSection />
        </div>
    );
};

export default DashBoard;
