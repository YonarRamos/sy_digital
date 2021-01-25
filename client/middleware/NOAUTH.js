export default function ({ store, redirect , req}) {
    // If the user is not authenticated   
    console.log('store: ',store.state.auth); 
    if(store.state.auth == false){
            return redirect('/login');
    }
    
  }