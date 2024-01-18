import ControlClimate from "@assets/images/strategiesImages/strategies/controlClimate.jpg"
import GetOnLevel from "@assets/images/strategiesImages/strategies/getOnLevel.jpg"
import ClearRoom from "@assets/images/strategiesImages/strategies/clearRoom.jpg"
import LoudNoises from "@assets/images/strategiesImages/strategies/loudNoises.jpg"
import MaintainRoutine from "@assets/images/strategiesImages/strategies/maintainRoutine.jpg"
import OldPhotos from "@assets/images/strategiesImages/strategies/oldPhotos.jpg"
import ValidateReassure from "@assets/images/strategiesImages/strategies/validateReassure.jpg"


export const strategies = [
  {
    title: "Get On Their Level",
    description:"Try backing away and making sure the area is quiet. Crouch down, so you can easily make direct eye contact.\n\nThe lower you are, the smaller you'll appear. This is much less threatening than looming over someone.",
    source: "Teepa Snow's 10 Steps to De-Escalating a Dementia Care Crisis",
    categories: ["Agitated Behavior", "Depressed Mood"],
    strategyId: "02d16e7e-628d-4514-b081-b32c3d76c2c0",
    image: GetOnLevel,
  },
  {
    title: "Maintain Routine",
    description:"Strategy 2",
    source: "Teepa Snow's 10 Steps to De-Escalating a Dementia Care Crisis",
    categories: ["Memory Care", "Depressed Mood", "Agitated Behavior"],
    strategyId: "a0e7231a-e27b-4b7d-bc41-2c31099491db",
    image: MaintainRoutine,
  },
  {
    title: "Bring Out Old Photographs",
    description:"Strategy 3",
    source: "Teepa Snow's 10 Steps to De-Escalating a Dementia Care Crisis",
    categories: ["Agitated Behavior", "Hygiene Trouble"],
    strategyId: "a54f6970-bbd0-4653-bdfa-299d24f35b85",
    image: OldPhotos,
  },
  {
    title: "Clear The Room",
    description:
      "Strategy 4",
    categories: ["Memory Care", "Hygiene Trouble", "Agitated Behavior"],
    strategyId: "f2b590a9-9634-4b5f-9db7-1f825c19634c",
    image: ClearRoom,
  },
  {
    title: "Check For Loud Noises",
    description:
      "Strategy 5",
    categories: ["Agitated Behavior"],
    strategyId: "f10e4fc5-cd4e-4f8f-ab0b-6178819ba3ad",
    image: LoudNoises,
  },
  {
    title: "Validate And Reassure",
    description:
      "Strategy 6",
    categories: ["Agitated Behavior"],
    strategyId: "fe4d55f6-1dca-46e3-afff-c438a0883d22",
    image: ValidateReassure,
  },
  {
    title: "Control The Climate",
    description:
      "Strategy 7",
    categories: ["Agitated Behavior"],
    strategyId: "ed52d93a-ae10-46ee-a62a-1c736c207668",
    image: ControlClimate,
  },
];
