# *The name of our store here*


## Endpoints

| Endpoint       | Method   | Description                                       | Handler |
| -------------- | -------- | ------------------------------------------------- |----------|
| `/allcategories`| `GET`   | Returns an array with all different item's categories   |  getCategories|
| `/companies`   | `GET`    | Returns array with all Companies       | getCompanies |
| `/company/:_id`   | `GET`  | Returns a single company based on _id param   | getCompany |
| `/item/:_id`   | `GET` | Returns a single item based on _id param  |getItem |
| `/items` | `GET`    | Returns Array of all items     | getitems  |
| `/users`     | `GET`   | Returns Array of all users  | getUsers |
| `/user/:_id` | `GET`    | Returns a single user based on the _id param | getUser |
| `/user/updatepassword`   | `PATCH`    | Allows to change password | updatePassword  |
| `/signup`       | `POST`    | Adds a new user   | addUser |
| `*` | `*` |                   |  |
| `*` | `*` |                   |  |
| `*` | `*` |                   |  |
| `*` | `*` |                   |  |
| `*` | `*` |                   |  |


#### Body expected

For update password requests( PATCH, updatePassword):

```json
{
	"email": "<Current Email>",
	"password": "<Current Password>",
	 "newPassword": "<New Password>"
	}
```

For new user requests (POST, addUser):

```json
{
	"firstName": "<First name of user>",
	"lastName": "<Last name of user>",
	"email": "<User's email> (cant be already registered)",
	"password": "<Password chosen>"
	}
```

For * requests:

```json
{

}
```


