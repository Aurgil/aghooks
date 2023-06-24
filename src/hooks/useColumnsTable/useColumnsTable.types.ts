/** Identifiant unique d'une colonne. Est composé selon l'index de la colonne */
export type TUTCId = string;

/** Definition of a column */
export type TUTCDef = {
    titre?: string;
    field?: string;
    children?: TUTCDefs;
};
/** List of definitions */
export type TUTCDefs = TUTCDef[];

/** A column */
export type TUTCColumn = TUTCDef & {
    parent?: TUTCId;
};
/** Liste of columns */
export type TUTCColumns = TUTCColumn[];

/** Columns extracted from column definitions */
export type TUTCFlatten = Record<TUTCId, TUTCColumn>;

/** Result of columns hook */
export type TUTCState = {
    flatten: TUTCFlatten;
    contents: TUTCColumns;
};

/** Function to make a column from a column definition */
export type TUTCMake = (def: TUTCDef, opts?: { parent?: TUTCId }) => TUTCColumn;
/** Function to extract and flat columns from defs */
export type TUTCFlat = (defs: TUTCDefs, parent?: TUTCId) => TUTCFlatten;
