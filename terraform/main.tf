terraform {
  required_providers {
    aws = "~> 3.27"
  }
  required_version = ">= 0.12.1"
}

provider "aws" {
  profile = "default"
  region  = "us-west-2"
}

# setup the EC2 instance
resource "aws_instance" "posdesia_server" {
  ami           = "ami-0affd4508a5d2481b"
  instance_type = "t2.micro"
  user_data = "${template_file.posdesia_web.rendered}"
  tags = {
    Name = "PosdesiaApp"
  }
}

#define the template
resource "template_file" "posdesia_web" {
  template = "${file("${path.module}/templates/application_setup.tpl")}"

  vars {
    posdesia_sshkey = "${var.user_ssh_key}"
    posdesia_node = "${base64encode(file("${path.module}/../package.json"))}"
    posdesia_app = "${base64encode(file("${path.module}/../index.js"))}"
  }
}
#DB variable declaration
variable postgres_user {
  type = string
}

variable postgres_pass {
  type = string
}

variable user_ssh_key {
  type = string
}

#setup the RDS Postgres DB
resource "aws_db_instance" "posdesia_db" {
  allocated_storage    = 100
  db_subnet_group_name = "posdesia_db_subnet_group"
  engine = "postgres"
  engine_version = "12.5-R1"
  identifier = "posdesia-db"
  instance_class = "db.t2.micro"
  password = var.postgres_pass
  skip_final_snapshot = true
  storage_encrypted = true
  username = var.postgres_user
}

#output handle for the DB
output "rds_endpoint" {
  value = "${aws_db_instance.default.endpoint}"
}