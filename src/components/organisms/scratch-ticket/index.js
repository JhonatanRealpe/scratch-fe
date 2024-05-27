import ScratchBoard from "../../molecules/scratch-board";

const ScratchTicket = () => {
    return (
        <div className="scratch-ticket">
            <div className="scratch-ticket__image"></div>
            <ScratchBoard />
        </div>
    );
};

export default ScratchTicket;