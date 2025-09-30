interface Cell {
    id: number;
    linkTo: string;
    title: string;
    isActive?: boolean;
    setIsActive: (id: number) => void;
}

export default Cell