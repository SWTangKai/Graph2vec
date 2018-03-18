export interface embedObject {
    id: string;
    pos: number[];
}

export interface LinkObject {
    source: string;
    target: string;
}

export interface NodeObject {
    id: string;
    size: number;
}

export interface GraphDataObject {
    links: LinkObject[];
    nodes: NodeObject[];
}
