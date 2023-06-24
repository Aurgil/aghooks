/** Identifiant unique d'une colonne. Est composé selon l'index de la colonne */
export type TUCTId = string;

/** Definition of a column */
export type TUCTDef = {
    titre?: string;
    field?: string;
    children?: TUCTDefs;
};
/** List of definitions */
export type TUCTDefs = TUCTDef[];

/** A column */
export type TUCTColumn = TUCTDef & {
    parent?: TUCTId;
};
/** Liste of columns */
export type TUCTColumns = TUCTColumn[];

/** Columns extracted from column definitions */
export type TUCTFlatten = Record<TUCTId, TUCTColumn>;

/** Result of columns hook */
export type TUCTState = {
    flatten: TUCTFlatten;
    contents: TUCTColumns;
};

/** Function to make a column from a column definition */
export type TUCTMake = (def: TUCTDef, opts?: { parent?: TUCTId }) => TUCTColumn;
/** Function to extract and flat columns from defs */
export type TUCTFlat = (defs: TUCTDefs, parent?: TUCTId) => TUCTFlatten;
