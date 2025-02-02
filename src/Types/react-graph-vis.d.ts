declare module 'react-graph-vis' {
    import { Component } from 'react';

    export interface Node {
        id: string | number;
        label?: string;
        title?: string;
        group?: string;
        [key: string]: any;
    }

    export interface Edge {
        from: string | number;
        to: string | number;
        [key: string]: any;
    }

    export interface Graph {
        nodes: Node[];
        edges: Edge[];
    }

    export interface Options {
        layout?: {
            hierarchical?: boolean;
        };
        edges?: {
            color?: string;
            smooth?: boolean;
        };
        nodes?: {
            shape?: string;
            size?: number;
            color?: {
                background?: string;
                border?: string;
            };
            font?: {
                color?: string;
            };
        };
        physics?: {
            enabled?: boolean;
        };
    }

    export interface Events {
        [event: string]: (params: any) => void;
    }

    export interface GraphProps {
        graph: Graph;
        options?: Options;
        events?: Events;
        style?: React.CSSProperties;
        getNetwork?: (network: any) => void;
        getEdges?: (edges: any) => void;
        getNodes?: (nodes: any) => void;
        identifier?: string;
    }

    class Graph extends Component<any> {} // <== הכנסנו את any כאן

    export default Graph;
}
