# Tickets

A platform for buying and selling event tickets.
Created for studying more advanced micro-services concepts on a larger scale application.

Featuring:
- Creating and managing event tickets
- Buying tickets with real payment processing
- Authentication
- Ticket locking and timeouts

Tech Standards:
- Typescript
- NextJS for client
- MongoDB, Redis for storage
- Code sharing between services
- Unit testing

Misc:
- Increasing the number of notifiers (ENOSPC error):
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

Thoughts
- --only=prod flag on Dockerfile: what's the best way to use it on dev?
