# Dev

## Error: ER_NOT_SUPPORTED_AUTH_MODE

### Error content

```sh
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

### Resolve

```sh
ALTER USER 'xxxx'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxxxxxx';

flush privileges;
```