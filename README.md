# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

LINKS: <br>
* Deployed website: https://holidazeyourlife.netlify.app/
* Figma design/prototype: https://www.figma.com/design/CcrkrDn1AX10MZSO9kgP72/HOLIDAZE-your-life?node-id=0-1&t=UUha4kNwcuakWNJw-1

THE PROJECT <br>
This is a Vite project built in React with Javascript, CSS, HTML and some Tailwind CSS.
The project contains working with the official Noroff API documentation for Holidaze, plan, design and build a modern front end accommodation booking application.


DESIGN CHOICES <br>
For this specific project, I wanted to create a feeling of going on vacation just by entering the website. That’s why I chose the hero image of a woman playing with her skarf - she looks “free” and relaxed, and is also at a famous vacation destination in this photo.

Colors: <br>
The blue color represents the blue sky or a blue ocean, which most people connects with warmer weather and summer days. Since I live in Norway, my thought was that most Norwegians really enjoy traveling to these warmer places, especially during the cold and dark Norwegian winters. Therefore I found it fitting. The buttons have very common colors, green for a positive action and red for deleting a venue - something you should think about before you do it. Most people are already familiar with these colors and what they might indicate, and therefore it is hard to misunderstand. This makes the buttons more user friendly. 

Icons: <br>
I added a lot of icons in this project, as they have the ability to communicate more concrete information to the end users than just text. Combined with the colored buttons, this provides good information about what a button does. It also gives a more complete look and feel, which is good for both the user interface and the user experience. 


TECHNICAL <br>
This project contains a lot of work with the Noroff API endpoints for Holidaze. The end user can see all venues ever created and search/filter through them. They can also view a specific venue for more information and booking (has to be logged in in order to make a reservation), view their upcoming reservations, change their profile information and log out. A regular guest user has some limitations, while a host user/venue manager can create new venues, and edit and delete their own venues in addition. When a new user is signing up via the sign up form, they can check off a checkbox in the form for if they want to be a host or not. A host can both create and manage venues, and also make reservations to other hosts’ venues. The navigation bar looks a little different for someone visiting the website without being logged in, for a guest user and for a venue manager user. 


THE PROCESS <br>
I started this whole process off with doing some research on similar websites, like lokalene.no and airbnb. I took some design inspiration from both of these websites, especially from the hero section at lokalene.no and the cards from airbnb. After deciding on a design, I asked some friends and family about their thoughts on it. After some feedback, I made a couple of changes and then started with the coding. I had a lot of interesting issues and errors along the way, both with the API endpoints and with things like a page not reloading properly. Overall, this was a fun project to do.



