import datetime

from beanie import Document


class Record(Document):
    """General Class for one data record."""

    probe_name: str | None = None
    probe_ip: str | None = None
    content: str
    timestamp: datetime.datetime
    type: str
    threat: bool
    attack_type: str

    class Settings:
        """Internal settings for MongoDB."""

        is_root = True
        validate_on_save = True
        name = "records"


class SyslogData(Record):
    """Data record for Syslog."""

    type: str = "syslog"

    class Settings:
        """Internal settings for MongoDB."""

        name = "syslog_data"


class DataflowData(Record):
    """Data record for Dataflow."""

    type: str = "dataflow"
    source_ip: str
    source_port: int
    target_ip: str
    target_port: int

    class Settings:
        """Internal settings for MongoDB."""

        name = "dataflow_data"
