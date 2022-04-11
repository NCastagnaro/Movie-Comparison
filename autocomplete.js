const createAutoComplete = ({root,renderOption,onOptionSelect,inputValue,fetchData}) => {
    //Selecting the element from the HTML file and adding in the HTML components
 //By adding the HTML components in the JS file, it makes it more reusable.
 root.innerHTML = `
   <label><b>Search</b></label>
   <input class="input" />
   <div class="dropdown">
     <div class="dropdown-menu">
       <div class="dropdown-content results"></div>
     </div>
   </div>
 `;
 
 const input = root.querySelector('input');
 const dropdown = root.querySelector('.dropdown');
 const resultsWrapper = root.querySelector('.results');
 
 //Inside of onInput we are making a request to fetch some data
 const onInput = async event => {
   const items = await fetchData(event.target.value);

   if(!items.length){
     dropdown.classList.remove('is-active');
     return;
   }

   //Each time data is fetched, the innerHTML changes to a blank string.
   resultsWrapper.innerHTML = '';

   //To make sure that we open up the menu, we need to add 
   //the is-active class to the element. 
 
   dropdown.classList.add('is-active');
   for (let item of items) {
     const option = document.createElement('a');
 //need to add dropdown-item, in accordance with Bulma documentation
     option.classList.add('dropdown-item');
         //need to use backticks to quote over multiple lines
     option.innerHTML = renderOption(item);
     option.addEventListener('click',() =>{
       dropdown.classList.remove('is-active');
       input.value = inputValue(item);
       onOptionSelect(item);
     })
//We want to apply all of the divs that we create, to the resultsWrapper   
     resultsWrapper.appendChild(option);
   }
 };
 input.addEventListener('input', debounce(onInput, 500));
 
 //event.target tells us what gets clicked
 document.addEventListener('click', event =>{
   if(!root.contains(event.target)){
     dropdown.classList.remove('is-active');
   }
 })
}
