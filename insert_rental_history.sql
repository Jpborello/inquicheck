-- SQL para insertar historial de alquileres manualmente
-- (SIN la columna comments porque no existe en la DB actual)

-- María González - 3 registros (Score esperado: 4.7)
INSERT INTO rental_history (tenant_id, agency_id, start_date, end_date, contract_status, payment_score, care_score)
SELECT 
    t.id as tenant_id,
    t.created_by as agency_id,
    '2023-01-01'::date,
    '2024-01-01'::date,
    'Finished',
    5,
    5
FROM tenants t WHERE t.dni = '35678901';

INSERT INTO rental_history (tenant_id, agency_id, start_date, end_date, contract_status, payment_score, care_score)
SELECT t.id, t.created_by, '2021-07-01'::date, '2022-12-31'::date, 'Finished', 5, 4
FROM tenants t WHERE t.dni = '35678901';

INSERT INTO rental_history (tenant_id, agency_id, start_date, end_date, contract_status, payment_score, care_score)
SELECT t.id, t.created_by, '2020-02-01'::date, '2021-06-30'::date, 'Finished', 4, 5
FROM tenants t WHERE t.dni = '35678901';

-- Carlos Mendoza - 2 registros (Score esperado: 3.5)
INSERT INTO rental_history (tenant_id, agency_id, start_date, end_date, contract_status, payment_score, care_score)
SELECT t.id, t.created_by, '2022-03-01'::date, '2023-08-31'::date, 'Finished', 3, 4
FROM tenants t WHERE t.dni = '42123456';

INSERT INTO rental_history (tenant_id, agency_id, start_date, end_date, contract_status, payment_score, care_score)
SELECT t.id, t.created_by, '2024-01-01'::date, NULL, 'Active', 4, 3
FROM tenants t WHERE t.dni = '42123456';

-- Laura Fernández - 1 registro (Score esperado: 2.0)
INSERT INTO rental_history (tenant_id, agency_id, start_date, end_date, contract_status, payment_score, care_score)
SELECT t.id, t.created_by, '2023-06-01'::date, '2023-11-30'::date, 'Terminated', 2, 2
FROM tenants t WHERE t.dni = '38456789';

-- Verificar:
SELECT COUNT(*) as total_records FROM rental_history;
SELECT 
    t.first_name, 
    t.last_name,
    COUNT(rh.id) as num_records,
    ROUND(AVG(rh.payment_score)::numeric, 1) as avg_payment,
    ROUND(AVG(rh.care_score)::numeric, 1) as avg_care
FROM tenants t
LEFT JOIN rental_history rh ON t.id = rh.tenant_id
GROUP BY t.id, t.first_name, t.last_name
ORDER BY avg_payment DESC;

