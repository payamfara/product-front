import RippleButton from "./RippleButton/RippleButton";
const PlusButton = ({ onClick }) => {
    return (
        <div className="lh-1 card shadow-sm p-2">
            <RippleButton onClick={onClick} type="button">
                <i className="lh-1 fs-4 fa-solid fa-plus"></i>
            </RippleButton>
        </div>
    );
};

export default PlusButton;