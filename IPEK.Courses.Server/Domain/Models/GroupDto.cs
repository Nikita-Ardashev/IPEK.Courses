﻿namespace IPEK.Courses.Server.Domain.Models
{
    public class GroupDto
    {
        public required Guid Id { get; set; }
        public string? Name { get; set; }
        public ICollection<string>? UserIds { get; set; }
    }
}
