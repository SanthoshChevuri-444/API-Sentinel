# API Sentinel — Entity Relationship Diagram (MVP)

## Mermaid ER diagram

GitHub renders the diagram below directly in Markdown. Keep this source version-controlled so the team can update the model alongside Prisma migrations.

```mermaid
erDiagram
    USER ||--o{ PROJECT : owns
    PROJECT ||--o{ API_SERVICE : registers
    PROJECT ||--o{ CONSUMER_SERVICE : registers

    API_SERVICE ||--o{ API_CONTRACT : has_versions
    API_CONTRACT ||--o{ CONTRACT_ANALYSIS : source_version
    API_CONTRACT ||--o{ CONTRACT_ANALYSIS : target_version
    USER o|--o{ CONTRACT_ANALYSIS : requests
    CONTRACT_ANALYSIS ||--o{ CONTRACT_CHANGE : detects

    CONSUMER_SERVICE ||--o{ API_DEPENDENCY : declares
    API_SERVICE ||--o{ API_DEPENDENCY : is_depended_on
    CONTRACT_CHANGE ||--o{ IMPACT_ASSESSMENT : evaluated_for
    API_DEPENDENCY ||--o{ IMPACT_ASSESSMENT : evaluated_in

    API_SERVICE ||--o{ HEALTH_CHECK : receives
    API_SERVICE ||--o{ INCIDENT : has
    INCIDENT o|--o{ HEALTH_CHECK : groups

    PROJECT ||--o{ AUDIT_LOG : contains
    USER o|--o{ AUDIT_LOG : performs

    USER {
        int id PK
        string name
        string email UK
        string password_hash
        datetime created_at
    }
    PROJECT {
        int id PK
        string name
        int owner_id FK
        datetime created_at
        datetime updated_at
    }
    API_SERVICE {
        int id PK
        int project_id FK
        string name
        string base_url
        string environment
        boolean is_active
        datetime created_at
        datetime updated_at
    }
    API_CONTRACT {
        int id PK
        int api_service_id FK
        string version
        json spec
        string spec_hash
        datetime created_at
    }
    CONSUMER_SERVICE {
        int id PK
        int project_id FK
        string name
        string description
        datetime created_at
    }
    API_DEPENDENCY {
        int id PK
        int consumer_service_id FK
        int api_service_id FK
        string operation_method
        string operation_path
        string_array consumed_fields
        datetime created_at
    }
    CONTRACT_ANALYSIS {
        int id PK
        int source_contract_id FK
        int target_contract_id FK
        int requested_by_id FK
        string status
        string summary
        datetime created_at
        datetime completed_at
    }
    CONTRACT_CHANGE {
        int id PK
        int analysis_id FK
        string operation_path
        string http_method
        string change_type
        string severity
        string title
        string description
        json old_value
        json new_value
    }
    IMPACT_ASSESSMENT {
        int id PK
        int contract_change_id FK
        int api_dependency_id FK
        string risk_level
        string reason
        string recommended_test
        datetime created_at
    }
    HEALTH_CHECK {
        int id PK
        int api_service_id FK
        int incident_id FK
        string status
        datetime checked_at
        int response_time_ms
        int http_status
        string error_message
    }
    INCIDENT {
        int id PK
        int api_service_id FK
        string title
        string status
        string severity
        datetime first_seen_at
        datetime last_seen_at
        datetime resolved_at
    }
    AUDIT_LOG {
        int id PK
        int project_id FK
        int actor_user_id FK
        string actor_type
        string action
        string resource_type
        string resource_id
        json details
        datetime created_at
    }
```

## Entity responsibilities

| Entity | Purpose |
|---|---|
| `User` | Account that owns projects and may request analyses. |
| `Project` | Scopes registered APIs, consumer services, and audit activity. |
| `ApiService` | An API provider registered for contract management and health checks. |
| `ApiContract` | An immutable version of an API's OpenAPI specification. |
| `ConsumerService` | A dependent application/service registered by the team. |
| `ApiDependency` | Declares which API operation and fields a consumer uses. This is the key input for impact analysis. |
| `ContractAnalysis` | Records a comparison between a source contract and a target contract. |
| `ContractChange` | Stores each detected difference and its rule-based severity. |
| `ImpactAssessment` | Connects a detected change to a registered dependency and explains the potential risk. |
| `HealthCheck` | Stores one scheduled API check result, including latency and observed status. |
| `Incident` | Groups repeated health-check failures into a trackable incident. |
| `AuditLog` | Records significant actions for traceability, including user-initiated and MCP-mediated activity. |

## Important integrity rules

1. A contract version must be unique within an API service: `(apiServiceId, version)`.
2. A consumer dependency must be unique for the same consumer, provider, HTTP method, and path.
3. An impact assessment must be unique for a particular contract change and dependency pair.
4. The source and target contracts in an analysis must belong to the same API service, and the source and target must be different. Validate this in the service layer.
5. The consumer and provider in an API dependency must belong to the same project. Validate this in the service layer for the MVP.
6. A `HealthCheck` may belong to zero or one `Incident`; an incident may group many checks.
7. Store OpenAPI specifications and before/after values as PostgreSQL JSONB through Prisma's `Json` type. Never store plaintext API secrets in `baseUrl`, contract specs, or logs.
8. Treat impact results as *potential impact* unless confirmed by consumer test results. Missing dependency records must be reported as a coverage limitation.

## MVP versus stretch scope

**MVP:** `Project`, `ApiService`, `ApiContract`, `ConsumerService`, `ApiDependency`, `ContractAnalysis`, `ContractChange`, and `ImpactAssessment`.

**Supporting features:** `HealthCheck` and `Incident`.

**Security/traceability:** `User` and `AuditLog`.

Keep the first implementation small. The diagram is the target MVP data model, but create and migrate the core contract/dependency tables first, then add monitoring and audit records in separate commits.
