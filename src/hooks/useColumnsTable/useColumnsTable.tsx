import { useCallback, useMemo } from "react";
import {
    TUCTDefs,
    TUCTState,
    TUCTDef,
    TUCTFlatten,
    TUCTId,
    TUCTColumn,
    TUCTMake,
    TUCTFlat,
} from "./useColumnsTable.types";

/**
 * To manage columns from definitions
 * @param defs Definitions to make columns
 * @returns Differents states make from definitions given
 */
export default function useColumnsTable(defs: TUCTDefs): TUCTState {
    /** To make a column from a definition */
    const makeColumn = useCallback<TUCTMake>((def: TUCTDef, opts) => {
        const colonne: TUCTColumn = { ...def, parent: opts?.parent };
        return colonne;
    }, []);

    /**
     * To make columns from definitions and extract them
     */
    const flatDefs = useCallback<TUCTFlat>(
        (defs, parent): TUCTFlatten => {
            const flatten: TUCTFlatten = {};

            for (let i = 0; i < defs.length; i++) {
                const def = defs[i];

                // Calculation of the key identifying the column
                const key: TUCTId = `${parent ? `${parent}-` : ""}${i}`;

                // Make column from def
                const column = makeColumn(def, { parent });

                // Adding column at flatten object by his key
                flatten[key] = column;

                // Adding each children's columns of the current column
                if (def.children) {
                    Object.assign(flatten, flatDefs(def.children, key));
                }
            }

            return flatten;
        },
        [makeColumn]
    );

    // Analysis of column definitions
    const { contents, flatten } = useMemo(() => {
        const contents: TUCTDefs = [];
        const flatten: TUCTFlatten = flatDefs(defs);
        return { contents, flatten };
    }, [defs, flatDefs]);

    return { contents, flatten };
}
