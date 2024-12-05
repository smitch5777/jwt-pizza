CURIOSITY REPORT:

I want to make a website for my friend who is an artist. The main priorities for this website are:

1. She can add or take out images in the portfolio section without my input.
2. She has no coding experience.
3. The most important thing is minimizing cost.

Different options:
Fully made:
Adobe studio
others like it

Partly made:
Wordpress
others

fully customizable:
AWS
Google Cloud

We are going to focus on the fully customizable options, and the goal will be to figure out how we can, while minimizing the cost, allow for her to upload images.

AWS S3:

This is an intriguing option. They have a free tier that would provide for a large amount of the cost. The kicker for AWS though is that it uses AWS S3 for storage. S3, while relatively user friendly for a computer nerd, it is rather scary for non-programmers. This is the biggest negative for using AWS. However the scalability and the ease of integration (as well as my own experience with AWS) definitely puts it in the running.

AWS Free Tier:
S3: 5 GB of free storage.
Lambda: 1 million free requests per month.
Cognito: Free tier for 50,000 monthly active users.

Estimated Monthly Costs (Beyond Free Tier):
Storage: $0.023/GB for S3 beyond the free tier.
Requests: $0.20 per 1 million Lambda requests.
Cognito: Minimal costs for light usage.

Overall, aws has minimum costs, a moderate user-friendliness, excellent scalability, and a considerable initial setup effort.

Google Cloud
Another good option (this one is cool mostly because I haven't used it before). Cloud storage is similar to S3, but firebase hosting makes static website deployment (what this is) much easier. Very interesting. I also learned that Google drive is compatible with google cloud, which means I might be able to connect a drive folder to the website which would make my friend's section of uploading photos and taking photos down in the future much easier.

Cost Analysis:
Free Tier:

Cloud Storage: Free 5 GB of storage.
Firebase Hosting: Free for basic usage (limited deploys and bandwidth).
Cloud Functions: 2 million free invocations per month.
Identity Platform: Free for up to 50,000 monthly active users.
Estimated Monthly Costs (Beyond Free Tier):

Storage: $0.020/GB beyond the free tier.
Functions: $0.40 per 1 million requests.
Identity: Minimal costs for small-scale use.

Overall, Google cloud has minimum costs, high user-friendliness (assuming Google drive is used), excellent scalability, moderate initial setup effort.

Google drive API:
The Google drive API doesn't have to be through Google cloud, which makes it an attractive option even if AWS is the final decision. Permissions however are difficult. Because google drive folders aren't meant to be used this way, the best way to make the images accessible is just to make all the images in the folder publicly accessible. This isn't a good idea because we do not want our images to be used elsewhere on the internet. We will have to solve this issue.

Cost Analysis
Storage -- Free for up to 15 GB; $1.99/month for 100 GB upgrade.
Google Drive API -- Free for light usage (10,000 API calls/day).

Final decision:
AWS. The training of using S3 is worth the extra security and the scalability offered by AWS. Google Cloud is an attractive option, but my experience with AWS will make it much easier to teach and help my friend learn to upload use photos.
