import { renderHook } from "@testing-library/react";
import useColumnsTable from "./useColumnsTable";

test("for useColumnsTable hook", () => {
    const { result } = renderHook(() =>
        useColumnsTable([
            {
                children: [{ field: "0" }, { field: "1" }],
            },
            { field: "2" },
        ])
    );

    expect(Object.keys(result.current.flatten).length).toBe(4);
    expect(result.current.contents.length).toBe(3);
});
