import { createStore } from "redux";
import reduxLeaves from "redux-leaves";

const [reducer, actions] = reduxLeaves({
    fitFinder: {
        age: null,
        size: null,
        weight: null,
        braSize: "",
        braCup: "",
        bellyForm: "",
        hipForm: "",
        result: {},

        fitPreference: 1,
    },
    projects: [
        {
            id: 1,
            name: "project1",
            created: new Date().toDateString(),
            lastUpdated: new Date().toDateString(),
            startDate: null,
            endData: null,
            country: { code: "FR", label: "", phone: "" },
            opType: "SOLD",
            phases: [{ name: "Phase 1", rate: 0, startDate: null, markdown: 0 }],
        },
        {
            id: 1,
            name: "project1",
            created: new Date().toDateString(),
            lastUpdated: new Date().toDateString(),
            startDate: null,
            endData: null,
            country: { code: "FR", label: "", phone: "" },
            opType: "SOLD",
            phases: [{ name: "Phase 1", rate: 0, startDate: null, markdown: 0 }],
        },
        {
            id: 1,
            name: "project1",
            created: new Date().toDateString(),
            lastUpdated: new Date().toDateString(),
            startDate: null,
            endData: null,
            country: { code: "FR", label: "", phone: "" },
            opType: "SOLD",
            phases: [{ name: "Phase 1", rate: 0, startDate: null, markdown: 0 }],
        },
        {
            id: 1,
            name: "project1",
            created: new Date().toDateString(),
            lastUpdated: new Date().toDateString(),
            startDate: null,
            endData: null,
            country: { code: "FR", label: "", phone: "" },
            opType: "SOLD",
            phases: [{ name: "Phase 1", rate: 0, startDate: null, markdown: 0 }],
        },
    ]
});

const store =
    process.env.NODE_ENV === "development"
        ? createStore(
            reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
        : createStore(reducer);

export { store, actions, reducer };
