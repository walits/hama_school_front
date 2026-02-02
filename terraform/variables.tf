variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-northeast-2"
}

variable "aws_profile" {
  description = "AWS CLI Profile"
  type        = string
  default     = "default"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "hama-school-front"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "domain_name" {
  description = "Custom domain name for CloudFront (optional, leave empty for CloudFront default domain)"
  type        = string
  default     = "" # 커스텀 도메인이 없으면 빈 문자열
}

variable "acm_certificate_arn" {
  description = "ACM certificate ARN for CloudFront (must be in us-east-1, only needed if domain_name is set)"
  type        = string
  default     = "" # 커스텀 도메인이 없으면 빈 문자열
}
