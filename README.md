       ____ _____ _   _      ___ _   _ _____ _____ ______     _____ _______        __
      / ___| ____| \ | |    |_ _| \ | |_   _| ____|  _ \ \   / /_ _| ____\ \      / /
     | |  _|  _| |  \| |_____| ||  \| | | | |  _| | |_) \ \ / / | ||  _|  \ \ /\ / /
     | |_| | |___| |\  |_____| || |\  | | | | |___|  _ < \ V /  | || |___  \ V  V /
      \____|_____|_| \_|    |___|_| \_| |_| |_____|_| \_\ \_/  |___|_____|  \_/\_/


`gen-interview` is a web application to help job seekers practice their interview skills by generating practical real world interview questions by topics and roles

The application can be accessed by going to [interviewpractice.info](https://interviewpractice.info)

## How to contribute questions

All of the questions are stored under `/src/data` folder. Each file in that folder represents a general topic for the questions. For example, `security_questions.json` file contains all questions related to security topic. Each question in a json file will follow the format:

```json
"[Question here]": {
  "comment": "This section contains any comment on answering the question",
  "resources": "This section provides any resources that can help reinforce the understanding of the topics required to answer the question",
  "tags": "This section is used to tag question to the appropriate topics for searching and filtering"
}
```

For example:

```json
"What happen when you go to google.com?": {
  "comment": "This question evaluates your understanding of different layers of the OSI model and the protocols involved in the process. I would start from the bottom of the stack from layer 1 to layer 7. You can briefly talk about each layer in one for two sentences. Layer 1 would typically not mentioned because it represents the physical network connection. However, you can talk about ARP, how one machine knows the network gateway, dns server, and be prepare to go into the details at each layer. For example, for layer 2, make sure you know about ARP table, MAC address; for layer 6, know the HTTPS handshake, etc...",
  "resources": [
    "https://github.com/alex/what-happens-when",
    "https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a",
    "https://www.youtube.com/watch?v=dh406O2v_1c"
  ],
  "tags": [
    "security_engineer",
    "security_analyst",
    "application_security_engineer"
  ]
}
```

To add more topics, you can create a json file and modify the `/src/pages/interview.js`. I used React hook `useEffect` that will import all json files under `InterviewLayout` component. I also use `useContext` to pass the data to the `InterviewHeader` component. Make sure you import and pass the appropriate data to the `InterviewHeader` component.
