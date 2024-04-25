INSERT INTO categories (name) VALUES 
('Personal'),
('Work'),
('Study'),
('Home'),
('Other');

-- removes duplicate categories
DELETE FROM categories
WHERE id NOT IN (
    SELECT MIN(id)
    FROM categories
    GROUP BY name
);

INSERT INTO tasks (user_id, title, description, completed, category, priority) VALUES 
(1, 'Create new app', 'Task management application', false, 'Work', 3),
(1, 'AWS', 'Studying for solutions architect', false, 'Study', 2),
(1, '3/26/24', 'Daily', true, 'Personal', 1);
