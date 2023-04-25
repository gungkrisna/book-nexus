import React from 'react';

export default React.createContext({
  currentAudiobookData: {
    writer: 'Michael Douglas Jr.',
    image: 'Futurama',
    length: 312,
    title: 'Futurama',
    description: "Managers who want to create positive work environments can use the insights and guidance provided in this audiobook to improve their leadership skills and foster a more supportive and productive workplace culture. The author, Michael Douglas Jr., draws on his extensive experience as a manager and consultant to offer practical strategies for building trust, promoting open communication, and empowering employees to take ownership of their work. The audiobook covers a range of topics, including effective communication techniques, conflict resolution strategies, and methods for promoting teamwork and collaboration. It also explores the importance of creating a sense of purpose and meaning in the workplace, and offers tips for aligning individual and team goals with the broader mission and values of the organization. Overall, this audiobook is a valuable resource for managers who are looking to create positive change in their organizations and build a more engaged, motivated, and high-performing team. By following the advice and insights provided in this audiobook, managers can cultivate a culture of trust, respect, and accountability that benefits both employees and the organization as a whole."
  },
  isLoading: true,
  showAudiobookBar: true
});
