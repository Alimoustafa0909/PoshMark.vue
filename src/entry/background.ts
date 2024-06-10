chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.action === 'post_detected') {
      const postId = message.postId;
  
      if (postId) {
        try {
          const share = await sharePost(postId);
          console.log('Fetched data:', share);


          if (sender.tab && sender.tab.id !== undefined) {
            chrome.tabs.sendMessage(sender.tab.id, {type: 'post', userMessage: share});
        } else {
            console.error('Sender tab is undefined.');
        }  

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
  
  async function sharePost(postId: any) {
      console.log(postId)
    // const url = `https://poshmark.com/vm-rest/users/self/shared_posts/${postId}?pm_version=2024.23.0`;
    try {
      const response = await fetch("https://poshmark.com/vm-rest/users/self/shared_posts/652aa31d39a1f683762af6f5?pm_version=2024.23.0", {
        headers: {
         "accept": "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-xsrf-token": "f66EUGiq-bgCkjmhByUImslxoxmP3Aybi8Ns",
        "referrer": "https://poshmark.com/closet/posh_pop",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{}",
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const share = await response.json();
      console.log(share)
      return share.userMessage;
    } catch (error) {
      console.error('Error fetching post data:', error);
      throw error; // Propagate the error to the caller
    }
  }
  