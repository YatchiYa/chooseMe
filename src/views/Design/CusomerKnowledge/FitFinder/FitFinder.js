import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Step1 from "./FitFinderSteps/Step1.js";
import Step2 from "./FitFinderSteps/Step2.js";
import Step3 from "./FitFinderSteps/Step3.js";
import Step4 from "./FitFinderSteps/Step4";
import Step5 from "./FitFinderSteps/Step5";
import Step6 from "./FitFinderSteps/Step6";

export default function FitFinder() {
    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={10}>
                <Wizard
                    validate
                    steps={[
                        {stepName: "Measurements", stepComponent: Step1, stepId: "step1"},
                        {stepName: "Add bra size", stepComponent: Step2, stepId: "step2"},
                        {stepName: "Tummy shape", stepComponent: Step3, stepId: "step3"},
                        {stepName: "Hip shape", stepComponent: Step4, stepId: "step4"},
                        {
                            stepName: "Fit preference",
                            stepComponent: Step5,
                            stepId: "step5",
                        },
                        {stepName: "Results", stepComponent: Step6, stepId: "step6"},
                    ]}
                    title="Build Your Profile"
                    subtitle="This information will let you predict the mensuration and the morphotype."
                    finishButtonClick={(e) => alert(e)}
                />
            </GridItem>
        </GridContainer>
    );
}
