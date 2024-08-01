 export type Item = {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
};

export type ItemMetaData = {
    id: string;
    name: string;
    description: string;
    image: string;
}

export type InventoryGrid = Array<Array<Item | null>>;