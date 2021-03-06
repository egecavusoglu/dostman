## Sample Usage

Let's assume your input file is sample.dostman

`sample.dostman`

```
@desc This will get user's info

@method POST
@url https://api.github.com/users/egecavusoglu

@headers
content-type: application/json

@body
{
    "public": true
}
```

You will get output

`sample.dostman.json`

```json
{
    "requests": [
        {
            "method": "GET",
            "url": "https://api.github.com/users/egecavusoglu",
            "headers": { "content-type": "application/json" },
            "body": { "public": true },
            "response": {
                "status": 200,
                "data": {
                    "login": "egecavusoglu",
                    "id": 42681882,
                    "node_id": "MDQ6VXNlcjQyNjgxODgy",
                    "avatar_url": "https://avatars.githubusercontent.com/u/42681882?v=4",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/egecavusoglu",
                    "html_url": "https://github.com/egecavusoglu",
                    "followers_url": "https://api.github.com/users/egecavusoglu/followers",
                    "following_url": "https://api.github.com/users/egecavusoglu/following{/other_user}",
                    "gists_url": "https://api.github.com/users/egecavusoglu/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/egecavusoglu/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/egecavusoglu/subscriptions",
                    "organizations_url": "https://api.github.com/users/egecavusoglu/orgs",
                    "repos_url": "https://api.github.com/users/egecavusoglu/repos",
                    "events_url": "https://api.github.com/users/egecavusoglu/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/egecavusoglu/received_events",
                    "type": "User",
                    "site_admin": false,
                    "name": "Ege Çavuşoğlu",
                    "company": "Washington University in St Louis",
                    "blog": "egecavusoglu.tech",
                    "location": "Seattle, WA",
                    "email": null,
                    "hireable": null,
                    "bio": "Senior computer science student. JS, TS and some Swift. Co founder @chember.co.\r\nInterning at @microsoft.\r\n",
                    "twitter_username": "egecavusoglu_",
                    "public_repos": 21,
                    "public_gists": 9,
                    "followers": 13,
                    "following": 24,
                    "created_at": "2018-08-24T19:03:29Z",
                    "updated_at": "2021-06-22T00:43:53Z"
                }
            }
        }
    ]
}
```
