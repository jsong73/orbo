INSERT INTO categories (name) VALUES 
('Personal'),
('Work'),
('Personal'),
('Study'),
('Home');


INSERT INTO tasks (user_id, title, description, completed, category, priority) VALUES 
(1, 'Create new app', 'Task management application', false, 'Work', 3),
(2, 'House To Dos', 'Errands', false, 'Home', 1),
(3, 'AWS', 'Studying for solutions architect', false, 'Study', 2),
(4, '3/26/24', 'Daily', true, 'Personal', 1);
