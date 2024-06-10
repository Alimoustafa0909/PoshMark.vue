chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse){

  if (message.action === 'startShare') {
    startSharing()
  }


  else if (message.action === 'post_detected') {
    const postId = message.postId;
    
    if (postId) {
      // Construct the URL with the dynamic post ID
      const url = `https://poshmark.com/vm-rest/users/self/shared_posts/${postId}?pm_version=2024.23.0`;

      try {
        // Fetch data from the constructed URL using async/await
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Handle the fetched data
        
        // Optionally send a response back to the sender
        sendResponse({ status: 'success', data });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        
      }
    }
  } else if (message.action === 'no_post_detected') {
    console.log('No post detected.');
  }
  
  // Return true to indicate you will respond asynchronously
  return true;
});


function startSharing (){
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //there is typescript here if we removed the tabId!== undefined compiler will give us an error 
    const tabId = tabs[0].id;
    if (tabId !== undefined) {
        chrome.tabs.sendMessage(tabId, { action: 'detecting' });
    } else {
        console.error('No active tab found.');
    }
});
}