chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    if (message.action === 'post_detected') {
      const postId = message.postId;
  
      if (postId) {
        try {
          const share = await sharePost(postId);
          console.log('Fetched data:', share);

          if (sender.tab && sender.tab.id !== undefined) {
            chrome.tabs.sendMessage(sender.tab.id, {type: 'sucess', share});
        } else {
            console.error('Sender tab is undefined.');
        }  

         } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          throw error;
        }
      }
    } else if (message.action === 'no_post_detected') {
      console.log('No post detected.');
    }
  
    return true;
  });
  
  async function sharePost(postId: string) {
      console.log(postId)
    // const url = `https://poshmark.com/vm-rest/users/self/shared_posts/${postId}?pm_version=2024.23.0`;
    try {
      const response = await fetch("https://poshmark.com/vm-rest/users/self/shared_posts/64e8e56f694d72922cedb6a1?pm_version=2024.23.0", {
        headers: {
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-xsrf-token": "ieSgr1Sa-wY5oHkpB8KgGbqRLxfI5W8nPlQ4"
        },
        "referrer": "https://poshmark.com/closet/posh_pop",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{}",
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
      });
      
      const share = await response.json();
      console.log(share)
      return share;
    } catch (error) {
      console.error('Error fetching post data:', error);
      throw error; // Propagate the error to the caller
    }
  }
  