import { useCallback, useMemo } from "react";
import {
    TUTCDefs,
    TUTCState,
    TUTCDef,
    TUTCFlatten,
    TUTCId,
    TUTCColumn,
    TUTCMake,
    TUTCFlat,
} from "./useColumnsTable.types";

/**
 * To manage columns from definitions
 * @param defs Definitions to make columns
 * @returns Differents states make from definitions given
 */
export default function useColumnsTable(defs: TUTCDefs): TUTCState {
    /** To make a column from a definition */
    const makeColumn = useCallback<TUTCMake>((def: TUTCDef, opts) => {
        const colonne: TUTCColumn = { ...def, parent: opts?.parent };
        return colonne;
    }, []);

    /**
     * To make columns from definitions and extract them
     */
    const flatDefs = useCallback<TUTCFlat>(
        (defs, parent): TUTCFlatten => {
            const flatten: TUTCFlatten = {};

            for (let i = 0; i < defs.length; i++) {
                const def = defs[i];

                // Calculation of the key identifying the column
                const key: TUTCId = `${parent ? `${parent}-` : ""}${i}`;

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
        const contents: TUTCDefs = [];
        const flatten: TUTCFlatten = flatDefs(defs);
        return { contents, flatten };
    }, [defs, flatDefs]);

    return { contents, flatten };
}
