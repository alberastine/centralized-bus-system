const BusDetailsPage = ({ busId }: { busId: string | null }) => {
    if (!busId) return <div>No bus selected</div>;

    return <div>Bus Details for ID: {busId}</div>;
};

export default BusDetailsPage;
