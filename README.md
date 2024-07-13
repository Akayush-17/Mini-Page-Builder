# MINI PAGE BUILDER

## Live Link 
https://minipage0builder.netlify.app/

## Images 
<div className="grid grid-cols-2 gap-2">
<img src="./public/mob1.png" alt="mobile image"/>
<img src="./public/mob2.png" alt="mobile image"/>
</div>

<img src="./public/mobmodal.png" alt="web dashboard"/>

<img src="./public/imgweb.png" alt="web dashboard"/>

# Exported JSON

<img src="./public/exportjson.png" alt="web dashboard"/>

# IMPORT JSON

<img src="./public/importjson.png" alt="web dashboard"/>
<img src="./public/jsonoutput.png" alt="web dashboard"/>

# Edit Modal

<img src="./public/modal.png" alt="web dashboard"/>


## Overview
This project is made with React.JS, TailwindCSS, TypeScript. It has a Sidebar and a Board you can create a form element using this tool by simply drag and drop functionality. 


## Features

- Drag and drop elements from the sidebar onto the board.
- Edit the properties of each element using a modal. use -> ctrl+Enter (Opens with enter key on localhost but on deployment it open with ctrl+Enter key combination)
- Save changes automatically to local storage.
- Delete elements from the board.
- Responsive design for mobile devices.


## Getting Started

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/Akayush-17/Mini-Page-Builder.git
   cd Mini-Page-Builder
   npm i
   npm run dev 



## Documentation 

### Sidebar Component
The Sidebar component provides a set of draggable elements that users can drag onto the Board.

### Props
#### onElementCreate: Function to create a new element on the board. Parameters include:

#### elementType: The type of the element (label, input, button).

##### top: The top position of the element.
##### left: The left position of the element.
##### text: The text content of the element (if applicable).
##### fontSize: The font size of the element.
##### fontWeight: The font weight of the element.

#### onDragStart: Function called when an element starts being dragged. Parameters include:

##### event: The drag or touch event.
##### elementType: The type of the element being dragged.

#### State

##### touchDragData: Stores the type of element being dragged during a touch event.


### Methods

#### createNewElement(elementType: string): Creates a new element with default properties and calls onElementCreate.
#### handleTouchStart(elementType: string): Stores the type of element being touched for dragging.
#### handleTouchMove(e: React.TouchEvent): Simulates a mouse move event during touch to enable drag-and-drop functionality.
#### handleTouchEnd(e: React.TouchEvent): Simulates a drop event when the touch ends.

### Rendered UI

#### Sidebar with buttons for each element type (label, input, button).
#### Buttons for creating elements in mobile view (hidden on desktops).
#### Draggable elements for desktop view (hidden on mobile).

### Board Component

#### The Board component represents the area where elements are dropped and positioned. It supports dragging and dropping of elements, both existing and new.

### Props

#### elements: Array of elements currently on the board.
#### onDrop: Function to add a new element to the board.
#### onMove: Function to move an existing element to a new position.
#### onEditMove: Function to update an existing element's properties.
#### onDelete: Function to delete an element from the board.

### State

#### draggedElement: Stores the ID of the element currently being dragged.
#### modalOpen: Boolean indicating if the edit modal is open.
#### currentElement: Stores the type and ID of the element currently being created.
#### elementData: Stores the properties of the element being edited or created.
#### editingElementId: Stores the ID of the element currently being edited.
#### selectedElementId: Stores the ID of the element currently selected.
#### windowWidth: Stores the current window width to handle responsive behavior.


### Methods

#### handleDrop(e: React.DragEvent): Handles dropping of elements, either creating a new element or moving an existing one.
#### handleDragStart(e: React.DragEvent, id: string): Initiates dragging of an existing element.
#### handleMouseMove(e: React.MouseEvent): Moves an existing element while dragging with the mouse.
#### handleTouchStart(id: string): Initiates dragging of an existing element via touch.
#### handleTouchMove(e: React.TouchEvent): Moves an existing element while dragging with touch.
#### handleTouchEnd(): Ends the dragging of an element via touch.
#### handleSave(): Saves the new or edited element to the board.
#### renderElement(element): Renders elements based on their type (label, input, button) with interactive behaviors.
#### handleDelete(): Deletes the selected element.
#### handleKeyDown(e: React.KeyboardEvent): Opens the edit modal when the "Enter" key is pressed.


### Rendered UI

#### Board area where elements can be positioned.
#### Elements displayed on the board (labels, inputs, buttons) with properties for positioning, font size, and font weight.
#### Edit modal for updating element properties.
#### Click and drag handlers for both mouse and touch interactions.

